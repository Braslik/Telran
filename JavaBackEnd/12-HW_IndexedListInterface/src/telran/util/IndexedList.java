package telran.util;

public interface IndexedList<T> {
void add(T obj);
boolean add (int index, T obj);
T remove(int index);
T get(int index);
int indexOf(Object pattern);
int lastIndexOf(Object pattern);
void reverse();
int size();
/**
 * removes first object equaled the pattern
 * @param pattern
 * @return reference to a removed object or null
 */
T remove(Object pattern);
/**
 * removes all objects equaled the ones from the given patterns
 * @param patterns
 * @return true if at least one object has been removed otherwise false
 */
boolean removeAll(IndexedList<T> patterns);
/**
 * checks if there is an object equaled the given pattern
 * @param pattern
 * @return true if exists otherwise false
 */
boolean contains(T pattern) ;
/**
 * removes all objects not equaled the ones from the given patterns
 * @param patterns
 * @return true if at least one object has been removed otherwise false
 */
boolean retainAll(IndexedList<T> patterns);
}
