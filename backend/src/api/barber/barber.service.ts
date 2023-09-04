import { Barber, Barbers, UpdateBarberInput } from './barber.model';

class BarberService {
  static update = (
    barber: UpdateBarberInput,
    barberID: number
  ): Promise<Barber> => {
    return Barbers.update({
      data: {
        barberName: barber.barberName,
        imageUrl: barber.imageUrl,
        totalExperienceInYear: barber.totalExperienceInYear,
      },
      where: {
        barberID,
      },
    });
  };

  static get = (): Promise<Barber[] | null> => {
    return Barbers.findMany();
  };

  static getByID = (barberID: number): Promise<Barber | null> => {
    return Barbers.findFirst({ where: { barberID } });
  };
}

export default BarberService;
