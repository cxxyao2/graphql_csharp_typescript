using GraphQlBackend.Data;
using GraphQlBackend.Entities;
using GraphQlBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace GraphQlBackend.Services
{

    public class CustomerService : ICustomerService
    {

        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CustomerService(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<Customer> AddOrUpdateCustomerAsync(CustomerModel customerModel)
        {
            Customer? customer;

            if (customerModel.Id == null)
            {
                customer = new Customer
                {
                    FirstName = customerModel.FirstName,
                    LastName = customerModel.LastName,
                    ContactNumber = customerModel.ContactNumber,
                    Email = customerModel.Email,
                    Address = new Address
                    {
                        AddressLine1 = customerModel.AddressLine1,
                        AddressLine2 = customerModel.AddressLine2,
                        City = customerModel.City,
                        State = customerModel.State,
                        Country = customerModel.Country
                    }
                };

                await _context.Customers.AddAsync(customer);
            }
            else
            {
                customer = await _context.Customers
                            .Where(c => c.Id == customerModel.Id)
                            .Include(c => c.Address)
                            .FirstOrDefaultAsync();

                if (customer == null)
                    throw new Exception($"Customer with id {customerModel.Id} was not found");

                customer.FirstName = customerModel.FirstName;
                customer.LastName = customerModel.LastName;
                customer.ContactNumber = customerModel.ContactNumber;
                customer.Email = customerModel.Email;
                customer.Address.AddressLine1 = customerModel.AddressLine1;
                customer.Address.AddressLine2 = customerModel.AddressLine2;
                customer.Address.City = customerModel.City;
                customer.Address.State = customerModel.State;
                customer.Address.Country = customerModel.Country;

                _context.Customers.Update(customer);
            }

            await _context.SaveChangesAsync();

            return customer;
        }

        public IQueryable<Customer> GetCustomersAndOrders()
        {


            return _context.Customers
                    .Where(c => !c.IsDeleted)
                    .Include(c => c.Orders.Where(o => !o.IsDeleted))
                    .Include(c => c.Address);

        }

        public async Task<bool> DeleteCustomerAsync(int customerId)
        {
            var customer = await _context.Customers
                                .Where(c => c.Id == customerId)
                                .FirstOrDefaultAsync();

            if (customer == null)
            {
                throw new Exception($"Customer with id {customerId} was not found");
            }

            customer.IsDeleted = true;

            var orders = await _context.Orders
                            .Where(o => o.CustomerId == customerId)
                            .ToListAsync();

            foreach (var order in orders)
            {
                order.IsDeleted = true;
            }

            _context.Customers.Update(customer);
            _context.Orders.UpdateRange(orders);

            return await _context.SaveChangesAsync() > 0;

        }
    }
}

