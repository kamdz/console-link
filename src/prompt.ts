import client from './client';

const port = prompt('Enter the port number of the console-link server:', '5001');

client(Number(port));
