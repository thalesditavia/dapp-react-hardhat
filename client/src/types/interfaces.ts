export interface CelularI {
  id: String;
  marca: String;
  modelo: String;
}

export interface AlertModalI {
  modalType: string;
  children: React.ReactNode;
}

export interface FormInputsI {
  marca: string;
  modelo: string;
}

export interface SmartphoneFormI {
  onSubmitAction: Function;
}

export interface BtnI {
  isLink?: boolean;
  to?: string;
  btnType?: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
}

export interface BtnModalI {
  isLink: boolean;
  to?: string;
  btnFunc?: () => void;
  children: React.ReactNode;
}
