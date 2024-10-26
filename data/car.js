class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false; 

    displayInfo() {
        console.log(`${this.#brand} - ${this.#model}`)
        console.log(this.speed);
        console.log(this.isTrunkOpen + ' Trunk');
    }

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    go() {
        if (this.speed + 5 < 200 && !this.isTrunkOpen) {
            this.speed += 5;
        }
        this.displayInfo();
    }

    stop() {
        if (this.speed - 5 >= 0) {
            this.speed -= 5;
        }
        this.displayInfo();
    }

    openTrunk() {
        this.isTrunkOpen = this.speed == 0 ? true : false;
        this.displayInfo()
    }

    closeTrunk() {
        this.isTrunkOpen = false;
        this.displayInfo();
    }
}

const car1 = new Car({
    brand: "Toyota",
    model: "Corolla"
});

const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3'
});


car1.go();
car1.go();
car1.openTrunk();
car1.stop();
car1.go();
car1.stop();
car1.go();
car1.stop()

car1.displayInfo()


class RaceCar extends Car {
    acceleration;
    

    go() {
        if(this.speed + this.acceleration <= 300) {
            this.speed += this.acceleration;
        }
        this.displayInfo()
    };

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    openTrunk() {};
    closeTrunk() {};
}

const raceCar1 = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
});

raceCar1.displayInfo();
raceCar1.go();
raceCar1.go();
raceCar1.openTrunk();
raceCar1.go();
raceCar1.brand = 'Civics';
raceCar1.displayInfo();