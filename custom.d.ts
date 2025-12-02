// custom.d.ts o global.d.ts
declare module "*.css" {
  // Esta declaración es un "stub" que le indica a TypeScript que la importación
  // de archivos .css es segura y tiene "efectos secundarios" (side-effects),
  // pero que no necesita exportar tipos específicos.
}
