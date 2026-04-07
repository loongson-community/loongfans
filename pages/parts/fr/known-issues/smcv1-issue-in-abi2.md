### La régulation de la fréquence du processeur peut ne pas fonctionner avec certaines distributions ABI 2.0

Les distributions ABI2.0 (« New World ») utilisant les noyaux Linux en amont ne disposent pas d'une gestion de la fréquence du processeur opérationnelle. Cela est dû à l'absence d'implémentation de l'interface SMCv1 dans le noyau Linux en amont. [Ils seront](https://github.com/ziyao233) a déposé une [correctif provisoire](https://lore.kernel.org/loongarch/20250623123321.5622-1-ziyao@disroot.org/), mais une instabilité a été constatée lors des essais.
