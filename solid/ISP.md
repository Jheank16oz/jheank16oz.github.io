# Interface Segregation Principle


El principio de Interface segregation en resumen dice que no debemos poner mucho en una interface; debemos separar en múltiples interfaces así no estaremos obligados a sobrescribir funcionalidades que no vamos a utilizar.


YAGNI(You Aren't Gonna Need It))


Encontré este buen ejemplo en Medium por Mihai Sandu


![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*I1ssa2070cIhtJ2Uhv39nQ.png)


Imagina que tenemos una Interface que se encarga de definir los controles que operan un vehículo, en ella se define las direcciones en las que puede ir un vehículo, como se ilustra en la imagen habrá situaciones o vehículos que no tienen las mismas cualidades de direccionamiento como en este caso el tren que va encarrilado y solo puede ir hacia delante o atrás, si bien Autopilot nos permite cumplir con el comportamiento del tren, obliga a que sobreescriba las funcionalidades de izquierda y derecha aunque no las utilicemos.


La idea principal y solución es no crear interfaces con mucha funcionalidad queriendo cubrir diferentes casos, en su lugar debemos crear diferentes interfaces.


En lugar de ...
```
public interface IDrivable // extracted interface from Car class
{
void GoForward();
void TurnLeft();
void TurnRight();
void GoBackward();
}
```


Mejor segmentar.
```
public interface ITurnable
{
void TurnLeft();
void TurnRight();
}


//mark the interface as obsolete
[Obsolete("IDrivable is deprecated. Please use IForwardDrivable or IBackwardDrivable interfaces")]
public interface IDrivable
{
void GoForward();
void GoBackward();
}


public interface IForwardDrivable
{
void GoForward();
}


public interface IBackwardDrivable
{
void GoBackward();
}
```
