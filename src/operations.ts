import { User } from "./usuario";
import { Funko } from "./funko";
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
     * @returns 0 si la operación ha salido correctamente o -1 si hubo algún error.
     */
    addFunko(newFunko: Funko): number {
        if(this._funkoCollection.find(funko => funko.id == newFunko.id) == undefined) {
            this.funkoCollection.push(newFunko);
            return 0;
        } else {
            return -1;
        }
    }

    /**
     * Modifica un funko de la lista de funkos del usuario.
     * @param newFunko Nuevo funko a añadir. Debe tener un ID que también lo tenga algún funko de la colección.
     * @returns 0 si la operación ha salido correctamente o -1 si hubo algún error.
     */
    modifyFunko(newFunko: Funko): number {
        const position = this._funkoCollection.findIndex(funko => funko.id == newFunko.id);
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
     * @returns 0 si la operación ha salido correctamente y -1 si hubo algún error.
     */
    deleteFunko(idFunko: number): number {
        const position = this._funkoCollection.findIndex(funko => funko.id == idFunko);
        if(position != -1) {
            this.funkoCollection.splice(position, 1);
            return 0;
        } else {
            return -1;
        }
    }

    /**
     * Muestra la lista de funkos del usuario, junto a la información detallada de cada uno.
     */
    listFunko(): number {
        this._funkoCollection.forEach((funko) => {
            console.log("----------------------------------")
            console.log(`ID: ${funko.id}`);
            console.log(`Nombre: ${funko.name}`);
            console.log(`Descripción: ${funko.description}`);
            console.log(`Tipo: ${funko.type}`);
            console.log(`Género: ${funko.gender}`);
            console.log(`Franquicia: ${funko.franchise}`);
            console.log(`Número: ${funko.number}`);
            console.log(`Exclusivo: ${funko.exclusive}`);
            console.log(`Características: ${funko.specialCharacteristics}`);
            if(funko.value < 20) {
                log(`Valor: ${chalk.red(funko.value)}`);
            } else if (funko.value < 50)
            {
                log(Valor: ${chalk.yellow(funko.value)});
                } else {
                log(Valor: ${chalk.green(funko.value)});
                }
                console.log(Año de lanzamiento: ${funko.launchYear});
                });
                return 0;
                }
                /**
 * Muestra información detallada de un funko en particular.
 * @param idFunko Id del funko del que se quiere obtener la información detallada.
 * @returns 0 si la operación ha salido correctamente o -1 si hubo algún error.
 */
showFunkoInfo(idFunko: number): number {
    const funko = this._funkoCollection.find(funko => funko.id == idFunko);
    if(funko !== undefined) {
        console.log("----------------------------------")
        console.log(`ID: ${funko.id}`);
        console.log(`Nombre: ${funko.name}`);
        console.log(`Descripción: ${funko.description}`);
        console.log(`Tipo: ${funko.type}`);
        console.log(`Género: ${funko.gender}`);
        console.log(`Franquicia: ${funko.franchise}`);
        console.log(`Número: ${funko.number}`);
        console.log(`Exclusivo: ${funko.exclusive}`);
        console.log(`Características: ${funko.specialCharacteristics}`);
        if(funko.value < 20) {
            log(`Valor: ${chalk.red(funko.value)}`);
        } else if (funko.value < 50) {
            log(`Valor: ${chalk.yellow(funko.value)}`);
        } else {
            log(`Valor: ${chalk.green(funko.value)}`);
        }
        console.log(`Año de lanzamiento: ${funko.launchYear}`);
        return 0;
    } else {
        return -1;
    }
    }
}