# Principio de Inversión de Dependencias (DIP)
El Principio de Inversión de Dependencias establece que los módulos de alto nivel no deben estar directamente ligados a los módulos de bajo nivel.

¿Por qué evitar depender de módulos de bajo nivel?
Cuando hablamos de módulos de alto nivel, nos referimos a la capa de lógica de negocio que no suele cambiar con frecuencia. Un ejemplo de esto es evitar la dependencia directa de frameworks para las funcionalidades de alto nivel.

## ¿Cómo evitar la dependencia de un módulo de bajo nivel?
Para evitar esta dependencia, es fundamental identificar qué corresponde a la lógica de negocio y qué no. Esto nos permitirá trasladar las partes no relacionadas con la lógica de negocio a una capa externa. En esta capa o módulo externo, podemos definir una interfaz o abstracción que actúe como puente entre nuestra lógica de negocio y el módulo externo.

Esta solución es ampliamente utilizada en los sistemas de código actuales, y muchas empresas adoptan una arquitectura que incluye un módulo llamado "Core", que contiene toda la lógica de negocio, abstracciones e interfaces. Luego, se crea un módulo diferente que contiene la implementación de esas interfaces o abstracciones.

## ¿Cómo se aplica este principio de manera más específica en el código?
Uno de los principales objetivos de este principio es evitar depender de funcionalidades concretas para probar nuestro código y permitir la simulación de diferentes estados de esas dependencias. De esta manera, podemos enfocarnos exclusivamente en la lógica de negocio.

En otras palabras, si una clase A depende de la clase B para realizar sus funciones, deberíamos poder proporcionar cualquier tipo de B como dependencia. Este principio también es relevante en casos donde nuestras clases importan bibliotecas que no pueden ser reemplazadas fácilmente. En tales casos, se crea una cohesión que se puede evaluar examinando las importaciones de nuestro módulo o clase. Si contiene paquetes de otros módulos, estamos incumpliendo este principio.