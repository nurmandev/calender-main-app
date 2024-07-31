import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { authConfig } from "../config/outlook";
import { googleConfig } from "../config/google";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import axios from "axios";

const SyncContext = createContext();

export const useSync = () => useContext(SyncContext);

export const SyncProvider = ({ children }) => {
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(false);
  const [userOutlook, setUserOutlook] = useState(null);
  const [userGoogle, setUserGoogle] = useState(null);
  const [userApple, setUserApple] = useState(null);
  const [eventsOutlook, setEventsOutlook] = useState([]);
  const [eventsGoogle, setEventsGoogle] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [googleCalendar, setGoogleCalendar] = useState([]);

  const discovery = AuthSession.useAutoDiscovery(
    `https://login.microsoftonline.com/${authConfig.tenantId}/v2.0`
  );

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: authConfig.clientId,
      redirectUri: authConfig.redirectUri,
      scopes: authConfig.scopes,
    },
    discovery
  );

  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: googleConfig.webClientId,
      scopes: googleConfig.scopes,
      iosClientId: googleConfig.iosClientId,
    });
  };
  useEffect(() => {
    configGoogleSignIn();
  }, []);

  useEffect(() => {
    GoogleSignin.signInSilently()
      .then((userInfo) => {
        setUserGoogle(userInfo);
        GoogleSignin.getTokens().then(({ accessToken }) => {
          setAccessToken(accessToken);
          fetchEventsGoogle(accessToken);
          fetchCalendarList(accessToken);
        });
      })
      .catch((error) => {
        if (error.code !== statusCodes.SIGN_IN_REQUIRED) {
          // console.error("silent google signin", error);
        }
      });
  }, []);

  useEffect(() => {
    if (result && result.type === "success") {
      const { code } = result.params;
      AuthSession.exchangeCodeAsync(
        {
          clientId: authConfig.clientId,
          scopes: authConfig.scopes,
          code,
          redirectUri: authConfig.redirectUri,
          extraParams: request.codeVerifier
            ? { code_verifier: request.codeVerifier }
            : undefined,
        },
        discovery
      )
        .then((response) => {
          fetchUserOutlook(response.accessToken);
          fetchEventsOutlook(response.accessToken);
        })
        .catch((error) => {
          console.error("Token exchange failed", error);
        });
    }
  }, [result]);

  const fetchUserOutlook = async (accessToken) => {
    try {
      const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserOutlook(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const fetchEventsOutlook = async (accessToken) => {
    try {
      const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const eventsData = response.data.value;
      setEventsOutlook(eventsData);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  const toggleAutoSync = () => {
    setIsAutoSyncEnabled((prev) => !prev);
  };

  const syncToOutlook = () => {
    promptAsync({ useproxy: true });
  };

  const syncToApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      setUserApple(credential);
      // signed in
    } catch (e) {
      console.log(e);
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };

  const signOutApple = async () => {
    await AppleAuthentication.signOutAsync();
    setUserApple(null);
  };

  const syncToGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserGoogle(userInfo);
      const { accessToken } = await GoogleSignin.getTokens();
      setAccessToken(accessToken);
      fetchEventsGoogle(accessToken);
      fetchCalendarList(accessToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error(error);
      }
    }
  };

  const fetchEventsGoogle = async (idToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      setEventsGoogle(response.data.items);
    } catch (error) {
      console.error("fetch google event", error);
    }
  };

  async function fetchCalendarList(accessToken) {
    try {
      const calendarListUrl =
        "https://www.googleapis.com/calendar/v3/users/me/calendarList";

      const response = await axios.get(calendarListUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setGoogleCalendar(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  async function shareCalendar(calendarId, email, permission) {
    if (!accessToken) return;
    try {
      const calendarApiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/acl`;

      const rule = {
        scope: {
          type: "user", // Options: user, group, domain, default
          value: email, // Email of the user to share the calendar with
        },
        role: "reader", // Options: none, freeBusyReader, reader, writer, owner
      };

      const response = await axios.post(calendarApiUrl, rule, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("done", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const logoutGoogle = async () => {
    // await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess();
    setUserGoogle(null);
    setEventsGoogle([]);
  };

  const logoutOutlook = async () => {
    await AuthSession.revokeAsync();
    setUserOutlook(null);
    setEventsOutlook([]);
  };

  return (
    <SyncContext.Provider
      value={{
        isAutoSyncEnabled,
        userOutlook,
        userGoogle,
        eventsOutlook,
        eventsGoogle,
        userApple,
        googleCalendar,
        toggleAutoSync,
        syncToGoogle,
        syncToOutlook,
        syncToApple,
        logoutGoogle,
        logoutOutlook,
        signOutApple,
        shareCalendar,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};
