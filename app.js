  function hashMap () {

    let buckets = Array(16);
    let count = 0;
    let loadFactor = 0.75;

    function hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
      } 

    function set (key, value) {
      let index = hash(key) % buckets.length;
      let object = new node(key, value);

      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      } else if (buckets[index] == undefined) {
        buckets[index] = object;
        count++;
        resize ()
      } else {
        let currentBucket = buckets[index];
        buckets[index] = object;
        buckets[index].next = currentBucket;
        count++;
        resize ()
      }
    }

    function resize () {
      if (count / buckets.length > loadFactor) {
        oldBuckets = buckets;
        buckets = Array(buckets.length * 2);
        count = 0;
        for (let i = 0; i < buckets.length; i++) {
          if (oldBuckets[i]!= undefined) {
            set(oldBuckets[i].key, oldBuckets[i].value);
            if (oldBuckets[i].next!= null) {
                set(oldBuckets[i].next.key, oldBuckets[i].next.value);
              }
          }
        }
      }
    }

    function get (key) {
      let index = hash(key) % buckets.length;
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      } else if (buckets[index] == undefined) {
        return null;
      } else {
        let currentBucket = buckets[index];
        while (currentBucket!= undefined) {
          if (currentBucket.key == key) {
            return currentBucket.value;
          }
          currentBucket = currentBucket.next;
        }
        return undefined;
      }
    }

    function remove (key) {
      let index = hash(key) % buckets.length;
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      } else if (buckets[index] == undefined) {
        return 'key not found: ' + key;
      } else {
        let currentBucket = buckets[index];
        let previousBucket = buckets[index];
        while (currentBucket!= undefined) {
          if (currentBucket.key == key) {
            if (previousBucket == currentBucket) {
              buckets[index] = currentBucket.next;
            } else {
              previousBucket.next = currentBucket.next;
            }
            count--;
            return currentBucket.value;
          }
          previousBucket = currentBucket;
          currentBucket = currentBucket.next;
        }
        return undefined;
      }
    }
    

    function has (key) {
      let index = hash(key) % buckets.length;
      if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      } else if (buckets[index] == undefined) {
        return false;
      } else {
        let currentBucket = buckets[index];
        while (currentBucket!= undefined) {
          if (currentBucket.key == key) {
            return true;
          }
          currentBucket = currentBucket.next;
        }
        return undefined;
      }
    }
    
    function length () {
      return count;
    }

    function clear () {
      buckets = Array(16);
      count = 0;
    }

    function values () { 
      let array = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]!= undefined) {
          array.push(buckets[i].value);
          if (buckets[i].next!= null) {
            array.push(buckets[i].next.value);
          }
        }
      }
      return array;
    }

    function keys () {
      let array = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]!= undefined) {
          array.push(buckets[i].key);
          if (buckets[i].next!= null) {
            array.push(buckets[i].next.key);
          }
        }
      }
      return array;
    }

    function entries () {
      let array = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]!= undefined) {
          array.push(buckets[i]);
          if (buckets[i].next!= null) {
            array.push(buckets[i].next);
          }
        }
      }
      return array;
    }

    function getBuckets () {
      let array = [];
      for (let i = 0; i < buckets.length; i++) {
          array.push(buckets[i]);
        }
      return array;
    }

    return {
      set,
      get,
      remove,
      has,
      length,
      clear,
      values,
      entries,
      keys,
      getBuckets
    }

  }

  function node (key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }

  const test = hashMap();

  test.set('apple', 'red')
  test.set('banana', 'yellow')
  test.set('carrot', 'orange')
  test.set('dog', 'brown')
  test.set('elephant', 'gray')
  test.set('frog', 'green')
  test.set('grape', 'purple')
  test.set('hat', 'black')
  test.set('ice cream', 'white')
  test.set('jacket', 'blue')
  test.set('kite', 'pink')
  test.set('lion', 'golden')
  test.set('moon', 'silver')

  console.log('entries: ', test.entries());
  console.log('keys: ', test.keys());
  console.log('length: ', test.length());
  console.log('buckets: ', test.getBuckets());

  console.log ('get banana: ', test.get('banana'));
  console.log ('get dog: ', test.get('dog'));
  console.log ('get cat: ', test.get('cat'));

  console.log('has banana: ', test.has('banana'));
  console.log('has dog: ', test.has('dog'));
  console.log('has cat: ', test.has('cat'));

  console.log('length: ', test.length());

  console.log('remove elephant: ', test.remove('elephant'));
  console.log('remove dog: ', test.remove('dog'));
  console.log('remove cat: ', test.remove('cat'));

  console.log('entries: ', test.entries());
  console.log('keys: ', test.keys());
  console.log('length: ', test.length());
  console.log('buckets: ', test.getBuckets());

  test.set('car', 'far');
  test.set('truck', 'near');
  test.set('bus', 'way');
  test.set('train', 'fast');
  test.set('plane', 'slow');

  console.log('entries: ', test.entries());
  console.log('keys: ', test.keys());
  console.log('length: ', test.length());
  console.log('buckets: ', test.getBuckets());
