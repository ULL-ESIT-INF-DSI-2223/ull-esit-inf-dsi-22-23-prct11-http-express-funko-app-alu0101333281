import { User } from "./User";
import { Funko } from "./Funko";
import chalk from "chalk";
const log = console.log;

/**
 * Clase que extiende a la clase usuario e incorpora operaciones sobre la colección
 * de funkos.
 */
export class OperableUser extends User {
    constructor(protected _id: number, protected _name: string, protected _funkoCollection: Funko[]) {
        super(_id, _name, _funkoCollection);
    }

    /**
     * Añade un funko a la colección de funkos del usuario.
     * @param newFunko Nuevo funko a añadir.
     * @returns 0 si la operación ha salido correctamente o -1 si hubo algun error.
     */
    addFunko(newFunko: Funko): number {
        if(this._funkoCollection.find(funko => funko.getId() == newFunko.getId()) == undefined) {
            this.funkoCollection.push(newFunko);
            return 0;
        } else {
            return -1;
        }
    }

    /**
     * Modifica un funko de la lista de funkos del usuario.
     * @param newFunko Nuevo funko a añadir. Debe tener un ID que tambien lo tenga algun funko de la colección.
     * @returns 0 si la operación ha salido correctamente o -1 si hubo algun error.
     */
    modifyFunko(newFunko: Funko): number {
        const position = this._funkoCollection.findIndex(funko => funko.getId() == newFunko.getId());
        if(position != -1) {
            this.funkoCollection[position] = newFunko;
            return 0;
        } else {
            return -1;
        }
    }

    /**
     * Elimina un funko de la lista de funkos del usuario.
     * @param idFunko Id del funko a eliminar.
     * @returns 0 si la operación ha salido correctamente y -1 si hubo algun error.
     */
    deleteFunko(idFunko: number): number {
        const position = this._funkoCollection.findIndex(funko => funko.getId() == idFunko);
        if(position != -1) {
            this.funkoCollection.splice(position, 1);
            return 0;
        } else {
            return -1;
        }
    }

    /**
     * Muestra la lista de funkos del usuario, junto a la infomración detallada de cada uno.
     */
    listFunko(): number {
        this._funkoCollection.forEach((funko) => {
            console.log("----------------------------------")
            console.log(`ID: ${funko.getId()}`);
            console.log(`Nombre: ${funko.getName()}`);
            console.log(`Descripcion:  + ${funko.getDescription()}`);
            console.log(`Tipo:  + ${funko.getType()}`);
            console.log(`Género:  + ${funko.getGender()}`);
            console.log(`Franquicia:  + ${funko.getFranchise()}`);
            console.log(`Número:  + ${funko.getNumber()}`);
            console.log(`Exlusivo:  + ${funko.isExclusive()}`);
            console.log(`Características:  + ${funko.getSpecialFeatures()}`);
            if(funko.getValue() < 20) {
                log("Valor: " + chalk.red(`${funko.getValue()}`))
            } else if (funko.getValue() < 50) {
                log("Valor: " + chalk.magenta(`${funko.getValue()}`))
            } else if (funko.getValue() < 200) {
                log("Valor: " + chalk.yellow(`${funko.getValue()}`))
            } else {
                log("Valor: " + chalk.green(`${funko.getValue()}`))
            }
        });
        return 0;
    }

    /**
     * Muestra la información detallada de un funko de la colección.
     * @param idFunko Id del funko del que se quiere mostrar la información.
     * @returns 0 si la operación ha salido correctamente y -1 si hubo algun error.
     */
    showFunkoInfo(idFunko: number): number {
        const index = this.funkoCollection.findIndex(funko => funko.getId() == idFunko);
        if(index != -1) {
            console.log("----------------------------------")
            console.log(`ID: ${this.funkoCollection[index].getId()}`);
            console.log(`Nombre: ${this.funkoCollection[index].getName()}`);
            console.log(`Descripcion:  + ${this.funkoCollection[index].getDescription()}`);
            console.log(`Tipo:  + ${this.funkoCollection[index].getType()}`);
            console.log(`Género:  + ${this.funkoCollection[index].getGender()}`);
            console.log(`Franquicia:  + ${this.funkoCollection[index].getFranchise()}`);
            console.log(`Número:  + ${this.funkoCollection[index].getNumber()}`);
            console.log(`Exlusivo:  + ${this.funkoCollection[index].isExclusive()}`);
            console.log(`Características:  + ${this.funkoCollection[index].getSpecialFeatures()}`);
            if(this.funkoCollection[index].getValue() < 20) {
                log("Valor: " + chalk.red(`${this.funkoCollection[index].getValue()}`))
            } else if (this.funkoCollection[index].getValue() < 50) {
                log("Valor: " + chalk.magenta(`${this.funkoCollection[index].getValue()}`))
            } else if (this.funkoCollection[index].getValue() < 200) {
                log("Valor: " + chalk.yellow(`${this.funkoCollection[index].getValue()}`))
            } else {
                log("Valor: " + chalk.green(`${this.funkoCollection[index].getValue()}`))
            }
            return 0;
        } else {
            return -1;
        }
    }
}