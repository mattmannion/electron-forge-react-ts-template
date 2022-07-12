import { ipcRenderer } from 'electron';

/**
 * This Object @chan is for the express purpose
 * of registering names for ipc channels.
 * They are grouped by purpose with a
 * send a receive string as final values.
 */

export const chan = {
  message: {
    s: 'message_s',
    r: 'message_r',
  },
  db: {
    posts: {
      read: {
        one: {
          s: 'db_post_read_one_s',
          r: 'db_post_read_one_r',
        },
        many: {
          s: 'db_post_read_many_s',
          r: 'db_post_read_many_r',
        },
      },
      insert: {
        one: {
          s: 'db_post_insert_one_s',
          r: 'db_post_insert_one_r',
        },
      },
      edit: {
        one: {
          s: 'db_post_edit_one_s',
          r: 'db_post_edit_one_r',
        },
      },
      delete: {
        one: {
          s: 'db_post_delete_one_s',
          r: 'db_post_delete_one_r',
        },
      },
    },
  },
};

// flattens objects down to a key and final values in an array
export function flattenObjToArr(
  obj: any,
  newObj: any = {},
  prefix: string = ''
): string[] {
  newObj = newObj || {};
  prefix = prefix || '';
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      const type = typeof obj[key];
      const newKey = !!prefix ? prefix + '.' + key : key;
      if (type === 'string') newObj[newKey] = obj[key];
      else if (type === 'object') flattenObjToArr(obj[key], newObj, newKey);
    }
  }
  return Object.values(newObj);
}

export const ipcListeners = {
  // stores all values of chan
  values() {
    return flattenObjToArr(chan);
  },
  // marks all values of chan for removal
  removeAll() {
    (<string[]>this.values()).forEach((v) => ipcRenderer.removeAllListeners(v));
  },
};
