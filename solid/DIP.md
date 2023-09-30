# Dependency Inversion Principle (DIP)

El principio de inversión de dependencias dice que los módulos de alto nivel no deben depender de módulos de bajo nivel.

# ¿Porque no depender de módulos de bajo nivel?

Cuando nos referimos a módulos de alto nivel, nos referimos a esa capa de Lógica de negocio que sabemos que no va a cambiar facilmente.

Así mismo se puede tomar como ejemplo no depender de Frameworks para las funcionalidades de alto nivel.

# ¿Cómo podemos evitar depender de un módulo de bajo nivel?

Primeramente debemos identificar que corresponde a lógica de negocio y que no, esto nos permitirá saber que podemos trasladar a una capa externa, para esta capa o módulo externo podemos definir una Interface o Abstracción que sea puente entre nuestra lógica de negocion y el módulo externo.

Esta solución es ampliamente utilizada en los sistemas de código actuales y por ende muchas empresas adoptan una arquitectura donde poseen un módulo llamado **Core** el cual contiene toda esa lógica de negocio, Abstracciones e Interfaces para posterior crear un módulo diferente que contenga la implementación de esas Interfaces o Abstracciones.

# ¿Cómo aplica este principio en código mas especifico?

Una de las razones principales de este  principio es evitar depender de funcionalidades para probar nuestro código y poder simular diferentes estados de esa dependencia para así concentrarnos netamente en la lógica de negocio.

Es decir si nuestra clase A depende de la clase B para realizar sus funcionalidades, deberiamos poder pasarle cualquier tipo de B, este principio tambien aplica por ejemplo para casos donde nuestras clases importan librerias y la misma no puede ser remplazada facilmente entonces se crea cohesión, una buena forma de trazar si hay cohesión es revisar que importaciones tiene nuestro módulo o clase, si contiene packages de otros módulos, estamos violando este principio.






