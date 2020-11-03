function solve(){

    function fighter(name){
        const instance = {
            name,
            health: 100,
            stamina: 100,
            fight
        };

        function fight(){
            instance.stamina--;

            console.log(`${instance.name} slashes at the foe!`);
        }

        return instance;
    }
    function mage(name){
        const instance = {
            name,
            health: 100,
            mana: 100,
            cast
        };

        function cast(spell){
            instance.mana--;

            console.log(`${instance.name} cast ${spell}`);
        }

        return instance;
    }

    return{
        fighter,
        mage
    };
}