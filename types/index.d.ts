declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}
declare module '*.module.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.module' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module 'lowdb/node' {
  export * from 'node_modules/lowdb/lib/node';
  export declare class JSONFile<T> {
    constructor(filename: string);
    read(): Promise<T | null>;
    write(obj: T): Promise<void>;
  }
}
