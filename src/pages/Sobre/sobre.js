import './sobre.css';

export function Sobre() {
    
    return (
        <div class="Container">

        <div class="div1">
            <h2>Sobre a Essencial</h2>
            <p>
                Descubra a Essencial, sua loja de roupas online definitiva.
                Aqui, a moda ganha vida com uma seleção meticulosamente escolhida
                de peças que vão desde os clássicos atemporais até as últimas
                tendências, tudo projetado para elevar o seu estilo. Com a conveniência
                de fazer compras a qualquer hora, de qualquer lugar, a Essencial torna fácil
                encontrar aquela peça perfeita que reflete sua personalidade única.
                Encontre sua essência na moda com a Essencial e deixe seu estilo brilhar.
            </p>
        </div>
        
        <div class="div2">
            <h2>Tabela de Tamanhos</h2>
            <table>
            <tr>
                <th>Tamanho</th>
                <th>Busto (cm)</th>
                <th>Cintura (cm)</th>
                <th>Quadril (cm)</th>
                </tr>
                <tr>
                <td>P</td>
                <td>84-89</td>
                <td>64-69</td>
                <td>89-94</td>
                </tr>
                <tr>
                <td>M</td>
                <td>90-95</td>
                <td>70-75</td>
                <td>95-100</td>
                </tr>
                <tr>
                <td>G</td>
                <td>96-101</td>
                <td>76-81</td>
                <td>101-106</td>
                </tr>
                <tr>
                <td>GG</td>
                <td>102-107</td>
                <td>82-87</td>
                <td>107-112</td>
                </tr>
                <tr>
                <td>XG</td>
                <td>108-113</td>
                <td>88-93</td>
                <td>113-118</td>
                </tr>
            </table>
        </div>
        
      </div>
    )
}