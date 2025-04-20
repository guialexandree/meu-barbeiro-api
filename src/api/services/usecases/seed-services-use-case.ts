import { Inject, Injectable, Logger } from '@nestjs/common';
import { IServicesRepository } from '../services.repository';
import { Service, ServiceStatus } from '../entities/service.entity';
import { IDateAdapter } from '../../../infra/adapters/protocols';

@Injectable()
export class SeedServicesUseCase {
  private readonly logger = new Logger(SeedServicesUseCase.name);

  constructor(
    @Inject('IServicesRepository')
    private readonly servicesRepository: IServicesRepository,

    @Inject('IDateAdapter')
    private readonly dateAdapter: IDateAdapter
  ) {}

  async execute (){
    const serviceCount = await this.servicesRepository.count()

    if (serviceCount === 0) {
      this.logger.verbose('Seeding Services ###')
      const defaultParams = {
        createdAt: this.dateAdapter.now(),
        updatedAt: this.dateAdapter.now(),
        status: ServiceStatus.Ativo,
      };

      const services = [
        {
          name: "corte",
          description: "",
          price: 30.0,
          timeExecution: 30,
          ...defaultParams,
          status: ServiceStatus.Inativo,
        },
        {
          name: "progressiva",
          description: "progessiva + hidratação",
          price: 80.0,
          timeExecution: 70,
          ...defaultParams,
        },
        {
          name: "barba",
          description: "progessiva + hidratação",
          price: 20.0,
          timeExecution: 15,
          ...defaultParams,
        },
        {
          name: "hidratação",
          description: "",
          price: 20.0,
          timeExecution: 15,
          ...defaultParams,
        },
        {
          name: "alisamento",
          description: "",
          price: 35.0,
          timeExecution: 40,
          ...defaultParams,
          status: ServiceStatus.Inativo,
        },
      ]

      const jobs: Promise<Service>[] = []
      for (const service of services) {
        const newService = new Service(service)
        jobs.push(this.servicesRepository.save(newService))
      }
      await Promise.all(jobs)
    }
  }
}
