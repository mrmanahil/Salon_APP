import ErrorResponse from '../../util/createError';
import Hash from '../../util/hash';
import {
  CreateUserInput,
  LoginUserInput,
  User,
  UserWithoutAddress,
} from './user.model';
import UserService from './user.service';

class UserHandler {
  static create = async (user: CreateUserInput): Promise<User> => {
    const { hashedPassword, salt } = await Hash.calculateHash(user.password);

    const newUser = await UserService.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      salt,
      userTypeID: user.userTypeID,
      isVerified: true,
      address: user.address || {
        addressLine1: '',
        addressLine2: '',
        cityID: 1,
        countryID: 1,
        stateID: 1,
      },
    });

    // switch (user.userTypeID) {
    //   case USER_TYPE.BARBER_USER:
    //     console.log('asd');
    //     break;
    //   case USER_TYPE.CUSTOMER_USER:
    //     console.log('asd');
    //     break;
    //   case USER_TYPE.SHOP_USER:
    //     ShopHandler.create({
    //       shopName: user.name,
    //       userID: newUser.userID,
    //     });
    //     break;
    //   default:
    //     break;
    // }

    return {
      ...newUser,
      email: newUser?.email || '',
      userTypeID: newUser?.userTypeID || 0,
      salt: newUser?.salt || '',
      isVerified: newUser?.isVerified || false,
      name: newUser?.customer ? newUser.customer.customerName : '',
      address: newUser.address
        ? newUser.address
        : {
            addressLine1: '',
            addressLine2: '',
            cityID: 1,
            countryID: 1,
            stateID: 1,
          },
    };
  };

  static getUserByEmail = async (
    email: string,
    userTypeID: number
  ): Promise<UserWithoutAddress | null> => {
    const newUser = await UserService.getUserByEmail(email, userTypeID);

    if (!newUser) {
      return null;
    }

    return {
      ...newUser,
      email: newUser?.email || '',
      userTypeID: newUser?.userTypeID || 0,
      salt: newUser?.salt || '',
      isVerified: newUser?.isVerified || false,
      name: newUser?.customer ? newUser.customer.customerName : '',
    };
  };

  static getUserByID = async (
    userID: number
  ): Promise<UserWithoutAddress | null> => {
    const newUser = await UserService.getUserByID(userID);

    if (!newUser) {
      return null;
    }

    return {
      ...newUser,
      email: newUser?.email || '',
      userTypeID: newUser?.userTypeID || 0,
      salt: newUser?.salt || '',
      isVerified: newUser?.isVerified || false,
      name: '',
    };
  };

  static getUserByPasswordAndEmail = async (
    email: string,
    password: string
  ): Promise<UserWithoutAddress | null> => {
    const newUser = await UserService.getUserByPasswordAndEmail(
      email,
      password
    );

    return {
      ...newUser,
      email: newUser?.email || '',
      userTypeID: newUser?.userTypeID || 0,
      salt: newUser?.salt || '',
      isVerified: newUser?.isVerified || false,
      name: newUser?.customer ? newUser.customer.customerName : '',
    };
  };

  static update = async (
    token: string,
    userID: number
  ): Promise<UserWithoutAddress | null> => {
    UserService.update(token, userID);

    return null;
  };

  static login = async (
    user: LoginUserInput
  ): Promise<UserWithoutAddress | null> => {
    const emailMatchedUser = await this.getUserByEmail(
      user.email,
      +user.userTypeID
    );

    if (!emailMatchedUser) {
      throw new ErrorResponse('Email or Password is Incorrect', 400);
    }

    const { hashedPassword } = await Hash.calculateHashWithSalt(
      user.password,
      emailMatchedUser.salt
    );

    const emailAndPasswordMatchedUser = await this.getUserByPasswordAndEmail(
      user.email,
      hashedPassword
    );

    if (!emailAndPasswordMatchedUser || !emailAndPasswordMatchedUser.userID) {
      throw new ErrorResponse('Email or Password is Incorrect', 400);
    }

    return emailAndPasswordMatchedUser;
  };
}

export default UserHandler;
