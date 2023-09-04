import bcrypt from 'bcrypt';

class Hash {
  static async calculateHash(password: string): Promise<{
    salt: string;
    hashedPassword: string;
  }> {
    const salt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(password, salt);

    return { salt, hashedPassword };
  }

  static async calculateHashWithSalt(password: string, salt: string) {
    const hashedPassword = await bcrypt.hash(password, salt);

    return { hashedPassword };
  }
}

export default Hash;
