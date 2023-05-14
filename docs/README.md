# Single Responsability Principle (SRP)


> El principio de única resposabilidad fue popularizado e introducido en los años 90's por Robert C. Martin (Uncle Bob)


Basicamente el principio agrupa ciertos términos y escritos anteriores, entre ellos:
* [On the Criteria To Be Used in Decomposing Systems into Modules](https://www.cs.umd.edu/class/spring2003/cmsc838p/Design/criteria.pdf) (David L. Parnas)
* The Separation of Concerns - [On the role of scientific thought](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html#:~:text=On%20the%20role%20of%20scientific%20thought) (Edsger Dijkstra)
* Coupling and Cohesion (Larry Constantine) feat. Tom DeMarco, Meilir Page-Jones y muchos otros.


Uncle Bob relata que se inspiró fuertemente en estos escritos y especialmente en la conclusión de Parnas:


> "Modules should be separated based, at lease in part, on the way that they might change"


Los modulos deben ser separados al menos en parte, de la forma en que podrian cambiar.


Es importante entender esta historia que nos describe Uncle Bob ya que así podemos entender el origen de ciertos términos y profundizar mas a detalle.


The separation of Concerns en español puede traducirse a Separación en responsabilidades, preocupaciones o asuntos, esto quiere decir que debemos separar nuestro sistema de acuerdo a un asunto o preocupación, ¿Porqué?, porque cuando separamos de esta forma cada parte de nuestro sistema nos permitirá en circunstancias en las cuales necesitemos realizar un cambio modificar una parte especifica sin afectar otras.


Esta práctica de separación por Asuntos evita recompilaciones innecesarias de partes de nuestro sistema por cambios en otras partes no involucradas directamente.


## ¿Cómo se aplica esto en código?


Como explicaba anteriormente el principio de responsabilidad única puede ser aplicado en diferentes contextos, pero el mas común es en el desarrollo de software y especificamente en código.


Buscando en mis repositorios viejos de GitHub, encontré este buen ejemplo de violación de SRP.


``` java
@Override
   public void onBackPressed() {
       if (areSecondaryColors){
           listColors.clear();
           listColors.addAll(getColors(getResources().getIntArray(R.array.colors)));
           mColorAdapter.notifyDataSetChanged();
           areSecondaryColors = false;
       }else {
           finish();
       }
   }
```


en Android, esta función onBackPressed permite reaccionar a cuando un usuario pulsa el botón back, aquí vemos que la función está limpiando una lista de colores y la está llenando a través de recursos, está gestionando el estado mediante un flag **areSecondaryColors** y finalizando la vista.


Un problema común que he visto con esta serie de violaciones de SRP es dívidir por funciones con el objetivo de corregirlas, ejemplo:


``` java
@Override
   public void onBackPressed() {
       if (areSecondaryColors){
           updateColorList();
       }else {
           finish();
       }
   }


   public void updateColorList() {
       listColors.clear();
       listColors.addAll(getColors(getResources().getIntArray(R.array.colors)));
       mColorAdapter.notifyDataSetChanged();
       areSecondaryColors = false;
   }
```
Este código se encuentra en una activity de Android algo así como una vista, si recordamos la teoria podremos identificar cual es el problema de este código.


### ¿Existe una única razón de cambio en este código?


Obviamente no, si cambiamos la forma en que obtenemos los recursos de colores afectamos el cómo se muestran y cómo funciona el BackPressed.


### ¿Cuántos Asuntos(Concerns) está manejando esta activity?


De entrada cada activity ya tiene un asunto, presentar la interfaz de usuario, está gestionando los recursos que va a dibujarle al usuario y cuando los va a dibujar.


### ¿Cuál es la mejor solución para este caso?
No existe la mejor solución pero sí podemos aplicar lo aprendido y sin ir a detalle en patrones de diseño ni funcionalidades de Android lo podríamos solucionar de esta forma:


``` java


   class ActivityColors extends Activity {
       ...
       @Override
       public void onBackPressed() {
           presenter.nextColors();
       }
      
       public void endPresentation() {
           finish();
       }


       public void displayColors(Array colors) {
           mColorAdapter.updateColors(colors);
       }
      
   }
   class ColorsPresenter {
       ...
       Boolean hasShowedAllColors = false;
       public void Presenter(){
           currentColors = repository.loadFirstColors();
           view.displayColors(currentColors)
       }


       public void nextColors() {


           if (hasShowedAllColors) {
               view.endPresentation()
           }


           currentColors = repository.loadSecondtColors();
           view.displayColors(currentColors)
           hasShowedAllColors = true;
       }
   }


   class ColorsRepository{
       ...
       public Array loadFirstColors() {
           return getColors(getResources().getIntArray(R.array.colors);
       }


       public Array loadSecondtColors() {
           return getColors(getResources().getIntArray(R.array.secondColors);
       }
   }


```


Como vemos en este ejemplo surgieron tres clases con sus propios Asuntos:
* **ActivityColors:** Se encarga de mostrarle al usuario los colores.
* **ColorsPresenter:** Se encarga del estado de presentación de los colores.
* **ColorsRepository:** Se encarga de la gestión de colores.


Esta separación nos permite desacoplar responsabilidades o asuntos permitiendo que por ejemplo el **Presenter** no tiene idea de cómo se muestran los colores ni cómo se gestiona la vista, tampoco tiene idea de cómo se están obteniendo los colores, la vista no conoce de ColorsRepository y tampoco sabe el estado de presentación de colores.


### ¿Existe una única razón de cambio en esta solución?


Esta pregunta puede ser interpretada de varias formas pero sí, podemos verlo con algunos ejemplos:


* Decidimos que el usuario va a visualizar los colores en una ventana de diálogo, esto implicaría cambios en la activity pero no en el Presenter ni el Repository.
* Decidimos que los colores se van a obtener de una API, implicaría cambios únicamente en el repositorio.
* Decidimos que solo vamos a mostrar la primera lista de colores, implica que cambiemos únicamente el presenter.


Cuando dije que la pregunta puede ser interpretada de varias formas es porque en algunas ocasiones el SRP es malinterpretado y pensamos que por ejemplo esta Activity debería hacer una única cosa literal como mostrar la vista y olvidarse del onBackPressed, de pasar a los siguientes colores, de invocar el adapter, de mostrar varios componentes...


Y sí podríamos hacerlo pero no siempre es necesario, lo importante es que cada parte tenga un único asunto o responsabilidad, por ejemplo la vista se encarga de asuntos netamente visual pero lo visual puede implicar muchísimas cosas como animaciones, notificaciones, actualizaciones, orientación, etc., dependerá de cómo vaya creciendo el producto para definir más actores con distintas responsabilidades ya que optimizar antes de tiempo podría ser desperdicio de tiempo.
