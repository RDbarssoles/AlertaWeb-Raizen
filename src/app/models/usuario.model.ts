export interface Usuario {
  NmUsuario: string;
  NmUsuarioCompleto: string;
  NmUsuNome?: string;      // login - nome completo (exibido no autocomplete)
  DsEmail?: string;
  NmCargo?: string;
}