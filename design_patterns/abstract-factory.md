# Abstract Factory (Creación de Objetos)

## Intención
Proveer una interface para la creación de familias de parientes o objetos dependientes sin especificar sus clases concretas.

## También conocida como
Kit

## Motivación
Considerar un kit de herramientas(toolkit) de interfaz de usuario que soporta multiples estándares de `look-and-feel` como Motif(Motif es una biblioteca para la creación de entornos gráficos bajo X Window System) y Presentation Manager(Presentation Manager (PM) es la interfaz gráfica de usuario (GUI) que IBM y Microsoft presentaron en la versión 1.1 de su sistema operativo OS/2 en 1988). Diferentes `look-and-feels` definen diferentes apariencias y comportamientos para los `widgets` de la interfaz de usuario como barras de scroll, ventana, y botones. Para ser portable a través de estándares look-and-feel, una aplicación no debe hacer hard-code de sus widgets para un look-and-feel particular. Instanciando clases de widgets con un look-and-feel especifico a lo largo de la aplicación hace muy difícil cambiar luego de look-and-feel.

Podemos solventar este problema definiendo una clase WidgetFactory abstracta que declara una interface para crear cada tipo básico de widget. También hay una clase abstracta para cada tipo de widget, y subclases concretas que implementan widgets para específicos estándares de look-and-feel. la interface de WidgetFactory tiene una operación que retorna un nuevo objeto widget para cada clase abstracta de widget. Los clientes llaman estas operaciones para obtener instancias de widget, pero los clientes no son conscientes de que clases concretas están usando. Por lo tanto esos clientes se mantienen independientes del look-and-feel prevaleciente. 

<img src="./../img/relationships-widget-factory.png">

Existe una subclase concreta de WidgetFactory para cada estándar de look-and-feel. Cada subclase implementa las operaciones para crear los widgets apropiados para el look-and-feel. Por ejemplo, la operación `CreateScrollBar` en el `MotifWidgetFactory` instancia y retorna un Motif scroll bar, mientras la operación correspondiente en el PMWidgetFactory retorna un scroll bar para Presentation Manager. Los Clientes crean los widgets solo a través de la interface WidgetFactory y no tienen conocimiento de las clases que implementan los widgets para un particular look and feel.