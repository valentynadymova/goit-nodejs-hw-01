const {v4} = require("uuid");
const fs=require("fs/promises");
const path= require('path');

const contactsPath = path.join(__dirname,'db/contacts.json') ;
console.log('contcatsPath:', contactsPath);


 async function listContacts() {
     const dataString= await fs.readFile(contactsPath,'utf8');
     const data=JSON.parse(dataString);
     return data;
  }
  
  async function getContactById(contactId) {
    const  allContacts= await listContacts();
    const contact= allContacts.find(item=>item.id===contactId);
    return contact ? contact:null;
  }
  
  async function removeContact(contactId) {
    const contacts=await listContacts();
    const idx= contacts.findIndex(item=>item.id===contactId);
    if(idx===-1){
        return null;
    }
     const removeContactbyId=contacts.filter((_,index)=>index !==idx);
     await fs.writeFile(contactsPath, JSON.stringify(removeContactbyId));
     return contacts[idx];
  }
  
  async function addContact(data) {
    const contacts= await listContacts();
    const newContact={...data, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

  module.exports={listContacts,getContactById,addContact,removeContact};