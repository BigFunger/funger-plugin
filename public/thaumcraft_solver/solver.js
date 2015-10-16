var aspects = require('plugins/funger-plugin/thaumcraft_solver/aspects');

module.exports = function findResult(startElementName, endElementName, iterations) {
  function findIteration(currentElementName, iteration, targetElementName, targetIteration) {
    var currentElement = _.first(_.filter(aspects, { name: currentElementName }));
    var targetElement = _.first(_.filter(aspects, { name: targetElementName }));

    if (iteration > targetIteration)
        return false;

    if (iteration == targetIteration && currentElementName == targetElementName)
    {
      result2.push(_.filter(aspects, { name : currentElementName })[0]);
      result.push(currentElementName);
      return true;
    }

    var childElements = [];
    if (currentElement.source1)
      childElements.push(currentElement.source1);

    if (currentElement.source2)
      childElements.push(currentElement.source2);

    childElements = _.union(childElements, _.pluck(_.filter(aspects, { source1 : currentElement.name }), 'name'));
    childElements = _.union(childElements, _.pluck(_.filter(aspects, { source2 : currentElement.name }), 'name'));

    for (var i=0;i<childElements.length;i++){
      var childElement = childElements[i];
      if (findIteration(childElement, iteration + 1, targetElementName, targetIteration)) {
        result2.push(_.filter(aspects, { name : currentElementName })[0]);
        result.push(currentElementName);
        return true;
      }
    }

    return false;
  }

  var result = [];
  var result2 = [];

  findIteration(startElementName, 1, endElementName, iterations);

  return result2;
};
