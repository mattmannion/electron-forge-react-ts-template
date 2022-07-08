/** */
/**
 * This file is for the express purpose of
 * registering immutable names for ipc channels.
 * Separate them as needed including outsourceing
 */
/** */

export const channel = {
  message: {
    send: 'message_send',
    receive: 'message_receive',
  },
  db: {
    send: 'db_send',
    receive: 'db_receive',
  },
};
