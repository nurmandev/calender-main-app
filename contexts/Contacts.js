import { createContext, useContext, useEffect, useState } from "react";
import * as Contacts from 'expo-contacts';

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });
    
            if (data.length > 0) {
              const contact = data[11];
              console.log("Contacts: ",contact);
                setContacts(data);
            }
          }
        })();
      }, []);
  return (
    <ContactsContext.Provider value={{
        contacts,
    }}>
      {children}
    </ContactsContext.Provider>
  )
}

export const useContacts = () => useContext(ContactsContext);