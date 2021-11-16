import { Usuario } from './usuario.model';

describe('Usuario', () => {
  it('should create an instance', () => {
    const expected = new Usuario('admin@gmail.com','123456')
    expect(expected).toBeTruthy();
  });
});