// Garante que o script seja executado apenas após o carregamento completo do DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Mapeamento dos elementos do DOM para constantes.
    const cepInput = document.getElementById('cep');
    const searchBtn = document.getElementById('search-btn');
    const addressForm = document.getElementById('address-form');
    const loading = document.getElementById('loading');
    const feedback = document.getElementById('feedback');
    const submitBtn = document.getElementById('submit-btn');
    const enderecoInput = document.getElementById('endereco');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');

    // Adiciona o evento de clique para o botão de busca de CEP.
    searchBtn.addEventListener('click', () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos.

        // Validação simples do CEP.
        if (cep.length !== 8) {
            showFeedback('CEP inválido. Digite 8 números.', 'danger');
            return;
        }

        fetchAddress(cep);
    });

    // Adiciona o evento de clique para o botão de envio do formulário.
    submitBtn.addEventListener('click', () => {
        const data = {
            cep: cepInput.value.replace(/\D/g, ''),
            endereco: enderecoInput.value,
            bairro: bairroInput.value,
            cidade: cidadeInput.value,
            estado: estadoInput.value,
            pais: 'Brasil'
        };

        saveAddress(data);
    });

    /**
     * Busca o endereço correspondente ao CEP na API do ViaCEP.
     * @param {string} cep - O CEP a ser consultado.
     */
    async function fetchAddress(cep) {
        showLoading(true);
        feedback.innerHTML = '';

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                throw new Error('Não foi possível consultar o CEP. Verifique sua conexão.');
            }
            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado.');
            }

            fillAddressForm(data);
            showAddressForm(true);

        } catch (error) {
            showFeedback(error.message, 'danger');
            showAddressForm(false);
        } finally {
            showLoading(false);
        }
    }

    /**
     * Envia os dados do endereço para serem salvos no backend.
     * @param {object} data - O objeto com os dados do endereço.
     */
    async function saveAddress(data) {
        showLoading(true);
        feedback.innerHTML = '';

        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Erro ao salvar o endereço.');
            }
            
            showFeedback(result.message, 'success');
            showAddressForm(false);
            cepInput.value = '';

        } catch (error) {
            showFeedback(error.message, 'danger');
        } finally {
            showLoading(false);
        }
    }

    /**
     * Preenche os campos do formulário com os dados do endereço.
     * @param {object} data - Os dados retornados pela API do ViaCEP.
     */
    function fillAddressForm(data) {
        enderecoInput.value = data.logradouro;
        bairroInput.value = data.bairro;
        cidadeInput.value = data.localidade;
        estadoInput.value = data.uf;
    }

    /**
     * Controla a visibilidade do formulário de endereço.
     * @param {boolean} show - Define se o formulário deve ser exibido.
     */
    function showAddressForm(show) {
        if (show) {
            addressForm.classList.remove('d-none');
        } else {
            addressForm.classList.add('d-none');
        }
    }

    /**
     * Controla a visibilidade do indicador de carregamento.
     * @param {boolean} show - Define se o loading deve ser exibido.
     */
    function showLoading(show) {
        if (show) {
            loading.classList.remove('d-none');
        } else {
            loading.classList.add('d-none');
        }
    }

    /**
     * Exibe uma mensagem de feedback para o usuário.
     * @param {string} message - A mensagem a ser exibida.
     * @param {string} type - O tipo de alerta (ex: 'success', 'danger').
     */
    function showFeedback(message, type) {
        feedback.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
});
