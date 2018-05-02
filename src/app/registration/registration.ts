export class Registration {
    constructor(
        public lastName: string,
        public firstName: string,
        public email: string,
        public password: string,
        public re_password: string,
        public country?: string,
        public city?: string,
        public userType?: string,
        public pan?: string
      ) {  }
}
