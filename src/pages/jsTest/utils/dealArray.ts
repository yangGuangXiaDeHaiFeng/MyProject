function Cat(name: string, color: string) {
  const obj = {
    name,
    color,
    type: '猫科动物',
  };
  return obj;
}
Cat.prototype.eat = function () {
  console.log('吃老鼠');
};

Array.prototype.checkNotEmpty = function () {
  if (Array.isArray(this) && this.length > 0) {
    return true;
  }
  return false;
};

export { Cat };
