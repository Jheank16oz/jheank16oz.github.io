# Liskov substitution Principle

El principio de Liskov fue introducido en el año 1987 por Barbara Liskov durante una conferencia, realmente ella nunca le dio este nombre mas bien fue adoptado por la comunidad y e incluso ella se enteró via email cuando un estudiante suyo le preguntó del tema bajo el nombre de Liskov substitution principle.

Barbara explica que se enteró que hierarchy(herencia) estaba siendo usado para dos diferentes propositos, el primero para herencia simple, cuando un clase implementa algo podemos crear una subclass que traiga de esa implementación lo que queremos y podemos agregar métodos extras y cambiar la representación del mismo, el otro método por el cual se estaba utilizando es por Type Hierarcy(Herencia de Tipo), lo cual permite crear un super type y luego una subclass extiende este tipo para convertirse en una subtype, ella comenta que no era muy entendido esta regla, un ejemplo en particular que da es que se creia que un Stack(LIFO) y Queue(FIFO) eran subtypes de una super type lo que para nada es cierto teniendo en cuenta la definición del siguiente principio.

En esta conferencia Barbara explicó lo siguiente:
>  A subtype should behave like an supertype as far as you can tell by using the super types methods

Este enunciado significa que un subtipo de una clase debe tener un comportamiento similar al de su supertipo, es decir, debe utilizar los mismos métodos que su supertipo y comportarse de manera consistente con él. En otras palabras, el subtipo debe seguir las reglas y comportamientos definidos por su supertipo para mantener la coherencia y consistencia en toda la jerarquía de clases.

Fuente
[Liskov: The Liskov Substitution Principle](https://youtu.be/-Z-17h3jG0A)