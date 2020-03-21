module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _plane?: objects.Plane;
        private _island?: objects.Island;

        private _cloudNumber:number;
        private _clouds?: objects.Cloud[];

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            this._island = new objects.Island();

            this._cloudNumber = config.Game.CLOUD_NUM;
            this._clouds = new Array<objects.Cloud>();

            // create an array of cloud objects
            for (let index = 0; index < this._cloudNumber; index++) 
            {
                this._clouds[index] = new objects.Cloud();             
            }
            
             this.Main();
        }        
        
        public Update(): void 
        {
           this._ocean.Update();

           this._island.Update();

           this._plane.Update();

           managers.Collision.squaredRadiusCheck(this._plane, this._island);

           this._clouds.forEach(cloud => {
               cloud.Update();
               managers.Collision.squaredRadiusCheck(this._plane, cloud);
           });

        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);

            this.addChild(this._island);

            this.addChild(this._plane);

            this._clouds.forEach(cloud => {
                this.addChild(cloud);
            });
           
        }

        
    }
}