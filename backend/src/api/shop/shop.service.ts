import { CreateShopInput, Shop, Shops } from './shop.model';

class ShopService {
  static create = async (shop: CreateShopInput & { userID: number }) =>
    Shops.create({
      data: {
        shopName: shop.shopName,
        userID: shop.userID,
      },
    });

  static getByID = (shopID: number): Promise<Shop | null> => {
    return Shops.findFirst({ where: { shopID } });
  };
}

export default ShopService;
