using GraphQlBackend.Entities;
using GraphQlBackend.Models;

namespace GraphQlBackend.Services
{
    public interface ICustomerService
    {
        IQueryable<Customer> GetCustomersAndOrders();

        Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customer);

        Task<bool> DeleteCustomerAsync(int customerId);
    }
}
