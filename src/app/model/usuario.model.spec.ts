import { Usuario } from './usuario.model';

describe('Usuario', () => {
  it('should create an instance', () => {
    expect(new Usuario('admin@gmail.com','123456')).toBeTruthy();
  });
});