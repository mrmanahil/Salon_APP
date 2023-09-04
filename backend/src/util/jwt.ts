import jwt from 'jsonwebtoken';

class Token {
  static getJWTToken<T extends {}>(
    payload: T,
    secretKey: string,
    expiry: string
  ) {
    return jwt.sign(payload, secretKey, { expiresIn: expiry });
  }
}

export default Token;
