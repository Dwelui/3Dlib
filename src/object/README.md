# Object

# Rename Object3D to instance
Instance class will be a compositive of Transform, Mesh, Texture, etc...

# Make Camera not subclass Object3D (Instance)
Camera should be compositive of Transform only

# Make Scene not subclass Object3D (Instance)
Scene should be compositive of Transform only

# Add Box subclass of Instance
It should the subclass of Instance with it's own API to control Mesh
Collapse BoxMesh into Box

# Instance and Camera should have their own translate, scale, rotate methods
