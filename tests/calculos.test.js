// 1. La función que vamos a probar (Imaginala en tu controlador de ventas)
const calcularTotal = (precio, cantidad) => {
    const IVA = 0.19;
    const subtotal = precio * cantidad;
    return subtotal + (subtotal * IVA);
};

// 2. Definición de las 3 pruebas para el informe
describe('Pruebas de cálculos de ventas - Grifos Center', () => {

    // Prueba 1: Cálculo normal
    test('Debe calcular correctamente el total de 2 grifos de $100.000 con IVA', () => {
        const resultado = calcularTotal(100000, 2);
        expect(resultado).toBe(238000); // 200.000 + 38.000 de IVA
    });

    // Prueba 2: Cantidad en cero
    test('Debe retornar 0 si la cantidad de productos es 0', () => {
        const resultado = calcularTotal(50000, 0);
        expect(resultado).toBe(0);
    });

    // Prueba 3: Precio unitario
    test('Debe calcular correctamente el IVA para un solo producto', () => {
        const resultado = calcularTotal(10000, 1);
        expect(resultado).toBe(11900);
    });

});