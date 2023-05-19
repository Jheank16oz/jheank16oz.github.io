# Open Closed Principle
>You should be able to extend the behavior of a system without having to modify that system.


En 1988 Bertrand Meyer en su libro  Object Oriented Software Construction definió este hermoso principio.


Este principio dice que si los módulos en nuestro sistema son extensibles sin necesidad de ser modificados, luego podremos agregar más funcionalidad sin necesidad de modificar código viejo.

El objetivo es agregar funcionalidad que no modifique el código viejo, lo que permite que las funcionalidades nuevas se introduzcan a través de código nuevo, además permitirá no tener que recompilar el código viejo ya que puede existir en un módulo aislado y las nuevas funcionalidades serán módulos compilados aparte.


También podemos decir que este principio no fue nada nuevo para su epoca ya que este comportamiento ya era considerado un anti patron, vease Shotgun surgery por Martin Fowler, el problema radica en que todavía se realizaba.


Ejemplos buenos donde aplican este principio son Minecraft, Visual Studio Code, Vim, Eclipse, IntellIJ, existe una cantidad absurda de herramientas que hoy en día podemos agregarles funcionalidad a través de plugins que resultan muy útiles.


Algo a tener en cuenta con este principio es que estas herramientas cierran sus políticas de negocio y permiten extender las funcionalidades de niveles más bajos, es decir, Minecraft permite extender sus funcionalidades a través de plugins que cambian funcionalidades enteramente visuales pero nunca van a extender la funcionalidad de autenticación o compra porque no sería rentable.


> The system doesn’t know about the plugins. The plugins know about the system.


# Conclusión

El objetivo de este principio es concentrarnos en el núcleo central de nuestro sistema y hacerlo más flexible, no sólo mediante la adición de funcionalidades por medio de plugins y módulos, sino también desvinculandose de las implementaciones de Frameworks. Sabemos que día a día se lanzan nuevos Frameworks o cambian los existentes, por lo que si nos enfocamos en el núcleo del negocio y nos desligamos de los Frameworks, podremos extender los niveles de detalle más bajos, sin comprometer la estabilidad del sistema.
