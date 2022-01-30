require('dotenv').config();

/**
 * Everything related to the window configuration is set here.
 * Undefined is the base value for the default window size in electron.
 * Replace the undefined values here or set the .env file with the
 * corresponding env keys-value pairs for desired position and size.
 */

/** Converts process.env key-value pairs into Ints from Strings */
function EnvToNum(value: 'H' | 'W' | 'X' | 'Y'): number | undefined {
  return Number.parseInt(process.env[value]);
}

/**
 * Interface for Window Configurations
 *
 * Note:
 * Optional x and y are only defined for
 * returning of the created object.
 *
 * @interface Win_cfg
 * @height  { number }
 * @width   { number }
 * @x       { number }
 * @y       { number }
 */

interface Win_cfg {
  height: number;
  width: number;
  x?: number;
  y?: number;
}

/**
 * Returns a Window Configuration object from
 * the values supplied by of one the following:
 *
 * 1. Environment variables H, W, X, and Y
 * 2. A valid height and width
 *
 * Note: The environment variables take precidence
 * over the passed in object properties. Both height and width
 * will be converted to Ints. x and y are
 * completely overridden by the env. In Prod x and y will
 * default to the center of the screen [undefined values for x and y
 * set the screen to the center].
 *
 * @height  { number }
 * @width   { number }
 * @x       { overridden or undefined }
 * @y       { overridden or undefined }
 */

export function win_cfg({ height, width, x, y }: Win_cfg): Win_cfg {
  return {
    height: EnvToNum('H') || height,
    width: EnvToNum('W') || width,
    x: EnvToNum('X'),
    y: EnvToNum('Y'),
  };
}
