// tell ts how to read css modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// tell ts how to read svg files
declare module "*.svg" {
  const content: string;
  export default content;
}