/** */
/**
 * This file is for the express purpose of
 * registering immutable names for ipc channels.
 * Separate them as needed including outsourceing
 */
/** */

export const chan = {
  message: {
    send: 'message_send',
    receive: 'message_receive',
  },
  db: {
    posts: {
      read: {
        one: {
          send: 'db_post_read_one_send',
          receive: 'db_post_read_one_receive',
        },
        many: {
          send: 'db_post_read_many_send',
          receive: 'db_post_read_many_receive',
        },
      },
      insert: {
        one: {
          send: 'db_post_insert_one_send',
          receive: 'db_post_insert_one_receive',
        },
      },
      edit: {
        one: {
          send: 'db_post_edit_one_send',
          receive: 'db_post_edit_one_receive',
        },
      },
      delete: {
        one: {
          send: 'db_post_delete_one_send',
          receive: 'db_post_delete_one_receive',
        },
      },
    },
  },
};
