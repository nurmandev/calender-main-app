export const authConfig = {
  clientId: "9fcf9072-2400-4380-bab3-7c2953d7605c",
  authority:
    "https://login.microsoftonline.com/e3e2f1c4-a96d-4180-98d0-4d6697f4b7b9",
  tenantId: "e3e2f1c4-a96d-4180-98d0-4d6697f4b7b9",
  redirectUri: "msal9fcf9072-2400-4380-bab3-7c2953d7605c://auth",
  scopes: [
    "openid",
    "profile",
    "offline_access",
    "User.Read",
    "Calendars.Read",
    "Calendars.Read.Shared",
    "Calendars.ReadWrite",
    "Calendars.ReadWrite.Shared",
  ],
};
