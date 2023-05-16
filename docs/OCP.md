# Open Closed Principle
>You should be able to extend the behavior of a system without having to modify that system.

En 1988 Bertrand Meyer en su libro  Object Oriented Software Construction definió este hermoso principio.

Este principio dice que si los módulos en nuestro sistema son extensibles sin necesidad de ser modificados, luego podremos agregar mas funcionalidad sin necesidad de modificar codigo viejo, la idea es diferente de las extensiones que proveen varios lenguajes de programación actuales de agregar funcionalidades a nuestro módulo a través de extensiones para lo cual podriamos decir que si estamos modificando el código viejo aunque no se recompile.

El objetivo es agregar funcionalidad que no modifique el codigo viejo, lo que permite que las funcionalidades nuevas se introduzcan a través de código nuevo, ademas permitirá no tener que recompilar el código viejo ya que puede existir en un módulo aislado y las nuevas funcionalidades serian modulos compilados aparte.

Tambien podemos decir que este principio no fue nada nuevo para su epoca ya que este comportamiento ya era considerado un anti patron, vease Shotgun surgery por Martin Fowler, el problema radica en que todavia se realizaba.

Ejemplos buenos donde aplican este principio son Minecraft, Visual Studio Code, Vim, Eclipse, IntellIJ..., existe una cantidad absurda de herramientas que hoy en día podemos agregarles funcionalidad a través de plugins que resultan muy útiles.

Algo a tener en cuenta con este principio es que estas herramientas cierran sus políticas de negocio y permiten extender las funcionalidades de niveles mas bajos, es decir, Minecraft permite extender sus funcionalidades a través de plugins, que cambian funcionalidades enteramente visuales pero nunca van a extender la funcionalidad de autenticación o compra porque no seria rentable.

>The system doesn’t know about the plugins. The plugins know about the system.

# Conclusion

La idea de este principio es centrarnos principalmente en el core de nuestro sistema y hacerlo extendible no solo por agregar funcionalidades a través de plugins y módulos sino tambien desligarnos de implementaciones de Frameworks ya que sabemos que día tras día salen nuevos Frameworks o cambian los existentes, si nos desligamos de estos Frameworks y nos centramos en el core del negocio podremos extender los niveles de detalle mas bajo como Frameworks y tecnológias.
