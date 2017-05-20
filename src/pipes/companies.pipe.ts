
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'CompaniesNameAndGoodsFilter'
})

export class CompaniesNameAndGoodsFilter implements PipeTransform {

    transform(value: any[], filter: string): any[] {
        filter = filter ? filter.toLocaleLowerCase() : null;


        return filter ? value.filter((company: any) => {

            if (company.companyName.toLocaleLowerCase().indexOf(filter) !== -1) {

                return company.companyName.toLocaleLowerCase().indexOf(filter) !== -1

            } else if (company.companyGoods && company.companyGoods.length) {

                for (let good of company.companyGoods) {
                    if (good.toLocaleLowerCase().indexOf(filter) !== -1) {
                        return good.toLocaleLowerCase().indexOf(filter) !== -1
                    }
                }
            } 
        }) : value;
    }

}