// tell ts how to read css modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}