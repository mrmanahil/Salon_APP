import { Barber, UpdateBarberInput } from './barber.model';
import BarberService from './barber.service';

class BarberHandler {
  static get = async (): Promise<Barber[] | null> => {
    return BarberService.get();
  };

  static getByID = async (barberID: number): Promise<Barber | null> => {
    return BarberService.getByID(barberID);
  };

  static update = async (
    barber: UpdateBarberInput,
    barberID: number
  ): Promise<Barber | undefined> => {
    const validatedBarber = UpdateBarberInput.parse(barber);

    if (validatedBarber) {
      const updatedBarber = await BarberService.update(
        {
          barberName: validatedBarber.barberName,
          imageUrl: validatedBarber.imageUrl,
          totalExperienceInYear: validatedBarber.totalExperienceInYear,
        },
        barberID
      );

      return updatedBarber;
    }

    return undefined;
  };
}

export default BarberHandler;
