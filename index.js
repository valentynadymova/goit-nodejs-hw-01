const { Command } = require('commander');
const program = new Command();
program
  .option("-a, --action <type>", "contact operation")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();
const contactsOperations= require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
    break;

    case 'get':
      const contact= await contactsOperations.getContactById(id);
      if (!contact){
          throw new Error (`Contact with id-${id} not found`)
      }
      console.log(contact);

      break;

    case 'add':
      const contactData={name,email,phone };
      const newContact= await contactsOperations.addContact(contactData);
      console.log(newContact);
      break;

    case 'remove':
      const removeContact= await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);