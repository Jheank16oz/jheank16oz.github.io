# Builder (Creación de Objetos)

## Objetivo
Separar la construcción de un objeto complejo de su representación, así el mismo proceso de construcción puede crear diferentes  representaciones. 

## Aplicabilidad
Usar el patron Builder cuando

* El algoritmo para crear un objeto complejo debe ser independiente de las partes que conforman el objeto y de cómo se ensamblan.
* El proceso de construcción debe permitir diferentes representaciones para el objeto que se está construyendo. 

## Estructura
<img src="./../img/structure-builder.png">

## Participantes
* **Builder**
  - Especifica una interface Abstracta para crear partes de un producto.
* **ConcreteBuilder**
  - Construye y ensambla partes del producto mediante implementación de la interface del Builder.
  - Define y realiza seguimiento de la representación que el mismo crea.
  - Provee una interface para obtener el producto.
* **Director**
  - Construye un objeto usando la Builder interface.
*  **Product**
   - Representa el objeto complejo en construcción, ConcreteBuilder construye la representación interna del producto y define el proceso por el que se ensambla.
   - Incluye clases que definen las partes que constituye, incluyendo interfaces para ensamblar las partes en el resultado final.
## Colaboraciones
  * El cliente crea el objeto Director y lo configura con el objeto Builder deseado.
  * El Director notifica al builder cada vez que una parte  del producto debe construirse.
  * el Builder gestiona las solicitudes del director y agrega las partes del producto.
  * El cliente recibe el producto del builder.

El siguiente diagrama de interacción ilustra como un Builder y Director cooperan con un Cliente.

<img src="./../img/interaction-builder.png">

## Consecuencias
Estas son algunas de las consecuencias del patron Builder:
  1. *Permite variar una representación interna del producto.* El objeto Builder provee el director con una interface abstracta para construir el producto. La interface permite al builder ocultar la representación y la estructura interna de el producto. Este también  oculta como el producto es ensamblado. Porque el producto es construido a través  una interface abstracta, Todo lo que se debe hacer para cambiar la representación interna del producto es definir un nuevo tipo de Builder.
  2. *Aísla el código para la construcción y representación.* El patron builder mejora la "modularidad" mediante la encapsulación  de la forma en que un objeto complejo es construido y representado. Los clientes no necesitan saber nada acerca de las clases que definen la estructura interna del producto; Tales clases no aparecen en la interface del Builder.
  Cada ConcreteBuilder contiene todo el código para crear y ensamblar un particular tipo de producto. El código es escrito una vez, luego diferentes Directors pueden reutilizarlo  para construir variantes del producto con las mismas partes.
  1. .*Te da un control más preciso sobre el proceso de construcción.* A diferencia de patrones de construcción que construyen productos en un solo llamado, el patron Builder construye paso a paso bajo e control de del Director. Solo cuando el producto es finalizado el director lo recupera del constructor. Esto permite un control preciso sobre el proceso de construcción y consecuentemente de la estructura interna del producto resultante.



