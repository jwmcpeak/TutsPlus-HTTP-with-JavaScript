const data = [{
    id: 1,
    name: "Custom 24 SE",
    manufacturer: "PRS",
    year: 2014,
    neck: "Mahogany",
    fingerboard: "Rosewood",
    frets: 24
},{
    id: 2,
    name: "Stratocaster",
    manufacturer: "Fender",
    year: 2012,
    neck: "Maple",
    fingerboard: "Rosewood",
    frets: 22
},{
    id: 3,
    name: "Talman",
    manufacturer: "Ibanez",
    year: 1996,
    neck: "Maple",
    fingerboard: "Rosewood",
    frets: 22
},{
    id: 4,
    name: "Les Paul Studio",
    manufacturer: "Gibson",
    year: 2012,
    neck: "Mahogany",
    fingerboard: "Rosewood",
    frets: 22
}];

module.exports = {
    all() {
        return data;
    },
    getById(id) {
        if (id < 0 || id > data.length) {
            return null;
        }

        return data[id - 1];
    },
    find(query) {
        let keys = Object.keys(query);

        return data.filter((guitar) => {
            return keys.every((key) => {
                // if the guitar doesn't have the provided property
                // we don't have a match
                if (!guitar[key]) {
                    return false;
                }

                if (typeof guitar[key] === 'string') {
                    return guitar[key].toLowerCase() == query[key].toLowerCase(); 
                }

                return guitar[key] == query[key]; 
            });
        });
    },
    add(guitar) {
        guitar.year = parseInt(guitar.year, 10);
        guitar.frets = parseInt(guitar.frets, 10);

        let length = data.push(guitar);
        guitar.id = length;

        return guitar;
    }
}