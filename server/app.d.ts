/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./util/lucia").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
