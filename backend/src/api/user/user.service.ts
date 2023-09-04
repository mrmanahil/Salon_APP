import { USER_TYPE } from '../../config/setup';
import { CreateBarberInput } from '../barber/barber.model';
import { CreateCustomerInput } from '../customer/customer.model';
import { CreateShopInput } from '../shop/shop.model';
import { CreateUserInput, UserWithPassword, Users } from './user.model';

class UserService {
  static create = async (user: UserWithPassword & CreateUserInput) => {
    const barber: CreateBarberInput | undefined =
      user.userTypeID === USER_TYPE.BARBER_USER
        ? {
            barberName: user.name,
            totalExperienceInYear: user.totalExperienceInYear || 0,
            imageUrl: '',
          }
        : undefined;
    const shop: CreateShopInput | undefined =
      user.userTypeID === USER_TYPE.SHOP_USER
        ? {
            shopName: user.name,
          }
        : undefined;
    const customer: CreateCustomerInput | undefined =
      user.userTypeID === USER_TYPE.CUSTOMER_USER
        ? {
            customerName: user.name,
          }
        : undefined;

    return Users.create({
      data: {
        isVerified: user.isVerified,
        email: user.email,
        password: user.password,
        salt: user.salt,
        userTypeID: user.userTypeID,
        address: {
          create: {
            addressLine1: user.address.addressLine1,
            addressLine2: user.address.addressLine2 || '',
            Country: {
              connect: { countryID: user.address.countryID },
            },
            State: {
              connect: { stateID: user.address.stateID },
            },
            City: {
              connect: { cityID: user.address.cityID },
            },
          },
        },
        barber: {
          create: barber,
        },
        customer: {
          create: customer,
        },
        shop: {
          create: shop,
        },
      },
      include: {
        address: true,
        barber: user.userTypeID === USER_TYPE.BARBER_USER,
        customer: user.userTypeID === USER_TYPE.CUSTOMER_USER,
        shop: user.userTypeID === USER_TYPE.SHOP_USER,
      },
    });
  };

  static getUserByID = async (userID: number) =>
    Users.findFirst({
      where: { customer: { customerID: userID } },
      select: {
        email: true,
        isVerified: true,
        password: false,
        salt: true,
        userTypeID: true,
        token: true,
        userID: true,
      },
    });

  static getUserByEmail = async (email: string, userTypeID: number) =>
    Users.findFirst({
      where: { email },
      select: {
        email: true,
        isVerified: true,
        password: false,
        salt: true,
        userTypeID: true,
        userID: true,
        customer: userTypeID === USER_TYPE.CUSTOMER_USER,
        shop: userTypeID === USER_TYPE.SHOP_USER,
      },
    });

  static getUserByPasswordAndEmail = async (email: string, password: string) =>
    Users.findFirst({
      where: { email, password },
      select: {
        email: true,
        isVerified: true,
        password: false,
        salt: true,
        userTypeID: true,
        userID: true,
        customer: true,
      },
    });

  static update = async (token: string, userID: number) =>
    Users.update({ where: { userID }, data: { token } });
}

export default UserService;
